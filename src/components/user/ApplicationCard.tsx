import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { db } from "@/src/db";
import { jobs } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Analysis from "@/src/models/Analysis";
import connectMongo from "@/src/lib/mongodb";

export async function ApplicationCard({ application }: { application: any }) {
  try {
    const job = await db
      .select()
      .from(jobs)
      .where(eq(jobs.id, application.jobId))
      .get();

    if (!job) return null;

    return (
      <Card className="w-full pt-6">
        {/* <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src="https://avatar.vercel.sh/shadcn1"
        alt="Logo"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      /> */}
        <CardHeader className="flex flex-col">
          <div className="flex items-center justify-between w-full">
            <CardTitle>{job.title}</CardTitle>
            <CardAction>
              <Badge variant="secondary" className="text-sm">
                {application.status}
              </Badge>
            </CardAction>
          </div>
          <CardDescription className="text-md text-foreground">
            <p>AI Score: {application.aiScore} %</p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-4 text-sm text-muted-foreground mb-4">
            {/* {aiFeedback.aiFeedback.decisionSummary} */}
          </p>
          <p className="text-muted-foreground text-sm">
            Applied: {new Date(application.createdAt).toDateString()}
          </p>
        </CardContent>
        <CardFooter>
          {/* <Button asChild variant="default" className="mt-2">
            <a
              href={application.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open CV
            </a>
          </Button> */}
        </CardFooter>
      </Card>
    );
  } catch (err) {
    if (err instanceof Error) {
      console.log("⛔️ err in app card:", err.message);
    }
    return null;
  }
}
