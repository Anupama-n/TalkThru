"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Form } from "@/components/ui/form";

import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/app/components/FormField";
import {useRouter} from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "@firebase/auth";

import {auth} from "@/firebase/client";
import {signIn, signUp} from "@/lib/actions/auth.action";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3, "Name must be at least 3 characters") : z.string().optional(),
        email: z.string().email("Invalid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {name, email, password} = values;

        try {
            if (type === "sign-up") {
                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name ?? "",
                    email,
                    password,
                });

                if (!result || !result.success) {
                    toast.error(result?.message ?? "Unknown error during sign-up.");
                    return;
                }

                toast.success('Account created successfully! Please Sign In.');
                router.push('/sign-in');
            } else {
                const userCredentials = await signInWithEmailAndPassword(auth, email, password);

                const idToken = await userCredentials.user?.getIdToken();
                if (!idToken) {
                    toast.error('There was an error signing in.');
                    return;
                }

                const response = await signIn({email, idToken});

                if (!response || !response.success) {
                    toast.error(response?.message ?? "Unknown error during sign-in.");
                    return;
                }

                toast.success('Signed in successfully!');
                router.push('/');
                console.log("Sign In", values);
            }
        } catch (error) {
            console.error("Authentication error:", error);
            toast.error(`There was an error: ${error}`);
        }
    }

        const isSignIn = type === "sign-in";

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-6 card py-14 px-10">
                <div className="flex flex-row gap-2 justify-center items-center">
                    <Image src="/logo.svg" alt="TalkThru" width={100} height={100} />
                    <h2 className="text-primary-100 text-2xl font-bold">TalkThru</h2>
                </div>
                <h3 className="text-center text-lg">Confidence Starts with Practice.</h3>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Enter your name"
                            />
                        )}
                        <FormField
                            control={form.control}
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />
                        <Button className="btn w-full" type="submit">
                            {isSignIn ? "Sign In" : "Create an Account"}
                        </Button>
                    </form>
                </Form>

                <p className="text-center">
                    {isSignIn ? "No Account Yet?" : "Already Have an Account?"}
                    <Link
                        href={isSignIn ? "/sign-up" : "/sign-in"}
                        className="font-bold text-user-primary ml-1"
                    >
                        {isSignIn ? "Sign Up" : "Sign In"}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm
