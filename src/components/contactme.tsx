// components/ContactMe.tsx
"use client";

import React from "react";
import Link from "next/link";

type Social = { label: string; href: string; icon?: React.ReactNode };

type Props = {
	title?: string;
	subtitle?: string;
	email?: string;
	phone?: string;
	location?: string;
	repo?: string;
	socials?: Social[];
	note?: string;
};

export default function ContactMe({
	title = "Contact Me",
	subtitle = "Looking to discuss, collaborate, or ask a question? Here’s how to reach me.",
	email = "rifkyandhikam@gmail.com",
	phone = "+62 851 5540 1397",
	location = "Bekasi, Indonesia",
	repo,
	socials = [
		{ label: "GitHub", href: "https://github.com/rifkyandhika" },
		{ label: "LinkedIn", href: "https://www.linkedin.com/in/rifkyandhikam/" },
		{ label: "Instagram", href: "https://www.instagram.com/rfky.andhika/" },
	],
	note,
}: Props) {
	return (
		<section id="contactme" className="w-full bg-white dark:bg-gray-900 py-16">
			{/* Container: sesuaikan lebar & padding dengan komponen lain */}
			<div className="container mx-auto px-6 lg:px-20">
				{/* Batasi lebar isi supaya tidak terlalu melebar di layar besar */}
				<div className="max-w-4xl mx-auto">
					<div className="md:flex md:gap-8 items-start">
						{/* Left: Text */}
						<div className="md:flex-1">
							<h2 className="text-3xl font-semibold mb-2 text-slate-900 dark:text-slate-100">{title}</h2>
							<p className="text-slate-600 dark:text-slate-300 mb-6">{subtitle}</p>

							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="p-4 rounded-lg border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
									<div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
									<a href={`mailto:${email}`} className="block text-sm text-indigo-600 dark:text-indigo-400 mt-1 break-all">
										{email}
									</a>
									<p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Preferred response within 1-3 business days</p>
								</div>

								<div className="p-4 rounded-lg border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
									<div className="text-xs text-slate-500 dark:text-slate-400">Phone</div>
									<Link
										href={`http://wa.me/6285155401397`}
										className="block text-sm text-indigo-600 dark:text-indigo-400 mt-1"
									>
										{phone}
									</Link>
									<div className="mt-2 text-xs text-slate-500 dark:text-slate-400">Available on weekdays (9:00 — 18:00)</div>
								</div>

								<div className="p-4 rounded-lg border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
									<div className="text-xs text-slate-500 dark:text-slate-400">Location</div>
									<div className="mt-1 text-sm text-slate-700 dark:text-slate-200">{location}</div>
								</div>

								{repo && (
									<div className="p-4 rounded-lg border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
										<div className="text-xs text-slate-500 dark:text-slate-400">Repository</div>
										<a target="_blank" rel="noreferrer" href={repo} className="block text-sm text-indigo-600 dark:text-indigo-400 mt-1 break-all">
											Open repository
										</a>
									</div>
								)}
							</div>

							{note && <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">{note}</p>}
						</div>

						{/* Right: Socials + small map preview */}
						<aside className="md:w-80 mt-8 md:mt-0">
							<div className="p-4 rounded-lg border border-slate-100 dark:border-neutral-800 bg-slate-50/60 dark:bg-neutral-900/60">
								<h3 className="text-lg font-medium text-slate-800 dark:text-slate-100">Find me on</h3>
								<p className="text-sm text-slate-600 dark:text-slate-300 mt-2">Connect via these platforms</p>

								<div className="mt-4 flex flex-wrap gap-2">
									{socials.map((s) => (
										<a
											key={s.href}
											href={s.href}
											target="_blank"
											rel="noreferrer"
											className="flex items-center gap-2 px-3 py-2 rounded-md bg-white/80 dark:bg-neutral-800/60 border border-slate-100 dark:border-neutral-800 hover:shadow-sm"
										>
											<span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-semibold">
												{s.label.charAt(0)}
											</span>
											<span className="text-sm text-slate-700 dark:text-slate-200">{s.label}</span>
										</a>
									))}
								</div>
							</div>

							<div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-50 to-white/60 dark:from-neutral-800 dark:to-neutral-900 border border-slate-100 dark:border-neutral-800">
								<div className="text-xs text-slate-500 dark:text-slate-400">Office / Base</div>
								<div className="mt-2 text-sm text-slate-700 dark:text-slate-200">{location}</div>
								<div className="mt-3 h-28 w-full rounded-md overflow-hidden bg-gray-200 dark:bg-neutral-800 flex items-center justify-center text-gray-500 dark:text-gray-400">
									<iframe
										src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126411.24483223888!2d106.89097501130037!3d-6.284362413551342!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c6900964f69%3A0xd00495351896398!2sBekasi%2C%20Kota%20Bks%2C%20Jawa%20Barat!5e1!3m2!1sid!2sid!4v1755504790706!5m2!1sid!2sid"
										width="100%"
										height="350"
										style={{ border: 0 }}
										allowFullScreen={true}
										loading="lazy"
										referrerPolicy="no-referrer-when-downgrade"
										className="rounded-lg shadow"
									/>
								</div>
							</div>
						</aside>
					</div>
				</div>
			</div>
		</section>
	);
}
