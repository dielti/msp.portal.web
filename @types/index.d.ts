export {}

declare global {
    interface Window {
        closeModal: {(): void} | null;
        modalOpen: boolean;
    }
}