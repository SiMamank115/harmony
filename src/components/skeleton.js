export default function Skeleton({ width, height, className, theme }) {
    return <div data-theme={theme ?? ""} style={{ width: width ?? "8rem", height: height ?? "2.25rem" }} className={["bg-gunmetal/40 dark:bg-seasalt/40 data-[theme=dark]:!bg-gunmetal/40 data-[theme=light]:!bg-seasalt/40 rounded animate-pulse",className].join(" ")}></div>;
}
