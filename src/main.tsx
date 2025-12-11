import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import faviconUrl from "@/assets/ryde-logo-Bh-MidXe-removebg-preview.png";

const ensureFavicon = () => {
	const existingLink = document.querySelector<HTMLLinkElement>("link[rel='icon']");
	const link = existingLink ?? document.createElement("link");

	const applyFavicon = (href: string, sizeHint?: number) => {
		link.rel = "icon";
		link.type = "image/png";
		link.href = href;
		if (sizeHint) {
			link.setAttribute("sizes", `${sizeHint}x${sizeHint}`);
		}
		if (!existingLink) {
			document.head.appendChild(link);
		}
	};

	const image = new Image();
	image.src = faviconUrl;
	image.onload = () => {
		const baseSize = Math.max(image.width, image.height) || 32;
		const upscaleFactor = 4;
		const minSize = 128;
		const targetSize = Math.min(Math.max(baseSize * upscaleFactor, minSize), 512);
		const canvas = document.createElement("canvas");
		canvas.width = targetSize;
		canvas.height = targetSize;
		const ctx = canvas.getContext("2d");

		if (!ctx) {
			applyFavicon(faviconUrl);
			return;
		}

		ctx.imageSmoothingEnabled = true;
		ctx.clearRect(0, 0, targetSize, targetSize);

		const scale = targetSize / baseSize;
		const drawWidth = image.width * scale;
		const drawHeight = image.height * scale;
		const offsetX = (targetSize - drawWidth) / 2;
		const offsetY = (targetSize - drawHeight) / 2;

		ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

		applyFavicon(canvas.toDataURL("image/png"), targetSize);
	};

	image.onerror = () => {
		applyFavicon(faviconUrl);
	};
};

ensureFavicon();

createRoot(document.getElementById("root")!).render(<App />);
