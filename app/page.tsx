import React from "react";
import { GETIMAGES } from "../utils/getimages";

import Image from "next/image";

import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";

async function Page() {
  const images = await GETIMAGES();
  return (
    <main className="mx-auto max-w-[1960px] p-4 bg-gradient-to-r from-blue-900 via-blue-500 to-blue-200">
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center">
              <Bridge />
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <div className="relative flex items-center justify-center flex-col w-20 bg-red-500">
            <h1 className="text-base font-bold uppercase tracking-widest">
              Nadish
            </h1>
          </div>

          <h1 className=" mb-4 text-base font-bold uppercase tracking-widest">
            لحظات سعيدة
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            إلى عائلتي العزيزة، أنتم النور الذي يضيء حياتي، والدفء الذي يملأ
            أيامي حبًا وسعادة. بكم تكتمل فرحتي، ومنكم أستمد قوتي. شكرًا لوجودكم
            الدائم، ودعمكم الذي لا ينضب. أحبكم من أعماق قلبي. ❤️
          </p>
        </div>
        <div className="flex gap-4 flex-wrap">
          {images.map(({ id, public_id, format, blurDataUrl }) => (
            <div
              className="drop-shadow-2xl   rounded-lg overflow-hidden p-1 shadow-xl"
              key={public_id}
            >
              <Image
                alt="Next.js Conf photo"
                className="transform rounded-lg brightness-90 transition group-hover:scale-50  "
                // placeholder="blur"
                // blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Page;
