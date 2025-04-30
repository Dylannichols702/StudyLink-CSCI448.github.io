customElements.define(
	"content-loader",
	class extends HTMLElement {
		constructor() {
			super();
		}

		connectedCallback() {
			this.checkAndLoadMedia();
		}

		async checkAndLoadMedia() {
			const videoUrl = "./assets/demo.mp4";
			const imageUrl = "./assets/test.jpg";

			try {
				const resp = await fetch(videoUrl, {method: "HEAD"});
				if (resp.ok) {
					this.loadVideo(videoUrl);
				} else {
					this.loadImage(imageUrl);
				}
			} catch (error) {
				console.error(`Error checking for video: ${error}`);
				this.loadImage(imageUrl);
			}
		}

		loadVideo(src) {
			const videoElement = document.createElement("video");
			videoElement.controls = true;
			videoElement.style.maxWidth = "100%";
			const sourceElement = document.createElement("source");
			sourceElement.src = src;
			sourceElement.type = "video/mp4";
			videoElement.appendChild(sourceElement);
			this.appendChild(videoElement);
		}

		loadImage(src) {
			const imageElement = document.createElement("img");
			imageElement.src = src;
			imageElement.alt = "Fallback Image";
			imageElement.style.maxWidth = "100%";
			this.appendChild(imageElement);
		}
	}
);
