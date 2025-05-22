import React from 'react'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {dummyInterviews} from "@/constants";
import InterviewCard from "@/app/components/InterviewCard";

const Page = () => {
    return (
        <>
            <section className="card-cta flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
                {/* Text Section */}
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Practice Interviews. Get Feedback. Succeed.</h2>
                    <p className="text-lg">
                        TalkThru helps you practice interviews with AI, get real-time feedback,
                        and build the confidence to succeed in any job opportunity.
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>

                {/* Image Section without Glow */}
                <div className="w-[400px] h-[400px] max-sm:hidden relative">
                    <Image
                        src="/robot.png"
                        alt="robot"
                        fill
                        className="object-contain"
                    />
                </div>
            </section>

            {/* Your Interviews Section */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview, index) => (
                        <InterviewCard key={index} {...interview} />
                    ))}
                </div>
            </section>
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take an Interview</h2>
                <div className="interviews-section">
                    {dummyInterviews.map((interview, index) => (
                        <InterviewCard key={index} {...interview} />
                    ))}
                    <p>You hav&apos;t taken any interviews yet!</p>
                </div>
            </section>
        </>
    );
}

export default Page;
