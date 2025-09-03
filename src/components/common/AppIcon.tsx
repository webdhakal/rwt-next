import React from "react";
import * as LucideIcons from "lucide-react";
import { HelpCircle, LucideProps } from "lucide-react";

type LucideIconComponent = React.ComponentType<LucideProps>;
type LucideIconMap = Record<string, LucideIconComponent>;

interface IconProps extends LucideProps {
    name?: string; // allow string (from API/DB/etc)
    className?: string;
    fallback?: string; // optional: custom fallback icon name
}

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    fallback,
    ...props
}: IconProps) {
    const icons = LucideIcons as LucideIconMap;

    const IconComponent = name ? icons[name] : null;
    const FallbackComponent = fallback ? icons[fallback] : HelpCircle;

    if (!IconComponent) {
        return (
            <FallbackComponent
                size={size}
                color="gray"
                strokeWidth={strokeWidth}
                className={className}
                {...props}
            />
        );
    }

    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            className={className}
            {...props}
        />
    );
}

export default Icon;
