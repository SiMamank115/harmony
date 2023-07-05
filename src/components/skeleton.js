export default function Skeleton({ width, height, className }) {
    return <div style={{ width: width ?? "8rem", height: height ?? "2.25rem" }} className={["bg-[var(--default-bg-1)] rounded animate-pulse",className].join(" ")}></div>;
}
