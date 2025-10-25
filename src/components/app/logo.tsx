export function Logo({ className }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center bg-primary rounded-md p-2 ${className}`}>
            <svg
                className="text-primary-foreground"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6 3H18V5H8V9H17V11H8V15H16V17H8V21H6V3Z"
                    fill="currentColor"
                />
            </svg>
        </div>
    );
}
