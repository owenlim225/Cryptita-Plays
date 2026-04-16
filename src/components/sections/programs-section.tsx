"use client";

import { motion } from "framer-motion";
import { programs } from "../site-data";

export function ProgramsSection() {
  return (
    <section id="programs" className="bg-slate-50 px-6 py-20">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="text-3xl font-bold text-slate-900">Programs</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-slate-900">{program.title}</h3>
              <p className="mt-3 leading-7 text-slate-600">{program.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
