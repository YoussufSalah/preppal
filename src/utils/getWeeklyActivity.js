import dayjs from "dayjs";
import { apiService } from "./APIService.js";

export async function getWeeklyActivity() {
    const token = apiService.getToken();

    const today = dayjs();

    const last7Days = Array.from({ length: 7 })
        .map((_, i) => today.subtract(i, "day").format("YYYY-MM-DD"))
        .reverse();

    const options = {
        filter: {
            op: "gte",
            column: "created_at",
            value: today.subtract(6, "day").startOf("day").toISOString(),
        },
        orderBy: { column: "created_at", ascending: true },
    };

    const makeReq = async (endpoint) => {
        try {
            const res = await apiService.makeRequest(endpoint, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ options }),
            });

            return res;
        } catch (err) {
            console.log("Error: ", err.message);
            throw err;
        }
    };

    const [summaries, flashcards, quizzes] = await Promise.all([
        makeReq("/summarize/"),
        makeReq("/flashcards/"),
        makeReq("/quizzes/"),
    ]);

    // Initialize the array for counts
    const dailyCounts = last7Days.map((date) => ({
        date,
        summaries: 0,
        flashcards: 0,
        quizzes: 0,
    }));

    // Count function
    const countPerDay = (res, key) => {
        (res?.data || []).forEach(({ created_at }) => {
            const day = dayjs(created_at).format("YYYY-MM-DD");
            const entry = dailyCounts.find((d) => d.date === day);
            if (entry) entry[key]++;
        });
    };

    countPerDay(summaries, "summaries");
    countPerDay(flashcards, "flashcards");
    countPerDay(quizzes, "quizzes");

    return dailyCounts;
}
