import React from 'react';
import dayjs from "dayjs";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DisplayTechIcons from "@/app/components/DisplayTechIcons";

const InterviewCard = ({
                           interviewId,
                           role,
                           type,
                           techstack,
                           createdAt,
                       }: interviewCardProps) => {

    const feedback = null as Feedback | null;

    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;
    const formattedDate = dayjs(feedback?.createdAt || createdAt || Date.now()).format("MMM DD, YYYY");

    return (
        <div className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div className="relative">
                    {/* Badge */}
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>

                    {/* Image */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover image"
                        width={90}
                        height={90}
                        className="rounded-full object-cover size-[90px]"
                    />

                    {/* Role */}
                    <h3 className="mt-5 capitalize">{role} Interview</h3>

                    {/* Date & Score */}
                    <div className="flex flex-row gap-4 mt-2">
                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/calendar.svg" alt="calendar" width={22} height={22} />
                            <p>{formattedDate}</p>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <Image src="/star.svg" alt="star" width={22} height={22} />
                            <p>{feedback?.totalScore ?? "---"}/100</p>
                        </div>
                    </div>

                    {/* Feedback */}
                    <p className="line-clamp-2 mt-5">
                        {feedback?.finalAssessment || "You haven't taken the interview yet!"}
                    </p>
                </div>

                {/* Footer Section */}
                <div className="flex flex-row justify-between items-center mt-6">
                    <DisplayTechIcons techStack={techstack} />

                    <Button asChild className="btn-primary">
                        <Link
                            href={
                                feedback
                                    ? `/interview/${interviewId}/feedback`
                                    : `/interview/${interviewId}`
                            }
                        >
                            {feedback ? "View Feedback" : "Take Interview"}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InterviewCard;
