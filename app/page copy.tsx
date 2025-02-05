"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Bridge from "../components/Icons/Bridge";
import Logo from "../components/Icons/Logo";
import Modal from "../components/Modal";
import type { ImageProps } from "../utils/types";
import { useLastViewedPhoto } from "../utils/useLastViewedPhoto";
import { GETIMAGES } from "../utils/getImages"; // Ensure the correct path

const Home = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const searchParams = useSearchParams();
  const photoId = searchParams.get("photoId");
  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await GETIMAGES();
      setImages(data);
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current?.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <main className="mx-auto max-w-[1960px] p-4">
      {photoId && (
        <Modal
          images={images}
          onClose={() => {
            setLastViewedPhoto(photoId);
          }}
        />
      )}
      <div className="columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
        <div className="relative mb-5 flex h-[629px] flex-col items-center justify-end gap-4 overflow-hidden rounded-lg bg-white/10 px-6 pb-16 pt-64 text-center text-white shadow-highlight">
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <span className="flex max-h-full max-w-full items-center justify-center">
              <Bridge />
            </span>
            <span className="absolute left-0 right-0 bottom-0 h-[400px] bg-gradient-to-b from-black/0 via-black to-black"></span>
          </div>
          <Logo />
          <h1 className="mt-8 mb-4 text-base font-bold uppercase tracking-widest">
            2022 Event Photos
          </h1>
          <p className="max-w-[40ch] text-white/75 sm:max-w-[32ch]">
            Our incredible Next.js community got together in San Francisco for
            our first ever in-person conference!
          </p>
          <a
            className="pointer z-10 mt-6 rounded-lg border border-white bg-white px-3 py-2 text-sm font-semibold text-black transition hover:bg-white/10 hover:text-white md:mt-4"
            href="https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-cloudinary&project-name=nextjs-image-gallery&repository-name=with-cloudinary&env=NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET,CLOUDINARY_FOLDER&envDescription=API%20Keys%20from%20Cloudinary%20needed%20to%20run%20this%20application"
            target="_blank"
            rel="noreferrer"
          >
            Clone and Deploy
          </a>
        </div>
        {images.map(({ id, public_id, format, blurDataUrl }) => (
          <Link
            key={id}
            href={`/?photoId=${id}`}
            shallow
            ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
            className="group relative mb-5 block w-full cursor-zoom-in"
          >
            <Image
              alt="Next.js Conf photo"
              className="transform rounded-lg brightness-90 transition group-hover:brightness-110"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
              width={720}
              height={480}
              sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
            />
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Home;
