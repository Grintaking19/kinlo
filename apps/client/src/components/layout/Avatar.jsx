import defaultAvatar from "../../assets/images/default-avatar-profile-icon.avif";

const SIZES = {
  sm: "w-6 h-6",
  md: "w-8 h-8",
  lg: "w-10 h-10",
};

const Avatar = ({ src, size = "md", alt = "User Avatar", className = "" }) => {
  if (!Object.keys(SIZES).includes(size) && size !== null) {
    if (import.meta.env.DEV) {
      console.error(
        `Invalid size provided to Avatar component: ${size}. Defaulting to "md".`,
      );
    }
    size = "md";
  }

  if (size === null) {
    if (import.meta.env.DEV) {
      console.warn(
        "Avatar: size is set to null. Defaulting to 'md' size for consistent styling.",
      );
    }
    size = "md";
  }

  if (import.meta.env.DEV && alt === "User Avatar") {
    console.warn(
      "Avatar: The default alt text 'User Avatar' is being used. Consider providing a more descriptive alt text for better accessibility.",
    );
  }

  const sizeClass = size ? SIZES[size] : SIZES.md;

  return (
    <div className={`overflow-hidden rounded-full bg-surface-2 ${sizeClass}`}>
      <img
        src={src || defaultAvatar}
        alt={alt || "User Avatar"}
        className={`block w-full h-full object-cover rounded-full  ${className}`}
        onError={(e) => {
          e.target.onerror = null; // Prevents infinite loop if the fallback image also fails
          e.target.src = defaultAvatar;
          e.target.alt = alt ?? "Default User Avatar"; // Handles Purly decorative images (Very Edgy Case)
        }}
      />
    </div>
  );
};

export default Avatar;
