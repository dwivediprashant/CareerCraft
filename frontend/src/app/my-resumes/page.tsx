'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAuthenticated } from '@/lib/auth';
import { getMyResumes, Resume } from '@/lib/profileApi';
import ResumeCard from '@/components/ResumeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function MyResumesPage() {
    const router = useRouter();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Check authentication
        if (!isAuthenticated()) {
            router.push('/signin');
            return;
        }

        fetchResumes();
    }, [router]);

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const data = await getMyResumes();
            setResumes(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch resumes');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id: string) => {
        setResumes((prev) => prev.filter((r) => r._id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 py-10 dark:bg-black">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="text-lg text-zinc-600 dark:text-zinc-400">Loading your resumes...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 py-10 dark:bg-black">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="mb-8 flex flex-col gap-2">
                    <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                        My Resumes
                    </p>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        Your Uploaded Resumes
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400">
                        View, download, or manage your resume history and analysis
                    </p>
                </div>

                {error && (
                    <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-200">
                        {error}
                    </div>
                )}

                {resumes.length === 0 ? (
                    <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="text-6xl mb-4">📄</div>
                        <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                            No resumes uploaded yet
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
                            Upload your first resume to get AI analysis and job matching.
                        </p>
                        <Link
                            href="/resume-upload"
                            className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow hover:bg-blue-700 transition-colors"
                        >
                            Upload Resume
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {resumes.map((resume) => (
                            <ResumeCard
                                key={resume._id}
                                resume={resume}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <Link
                        href="/resume-upload"
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                        ← Upload a new resume
                    </Link>
                </div>
            </div>
        </div>
    );
}
