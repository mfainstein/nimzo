export interface Persistence {
    save(message: string): void;

    load(): void;
}
