import { Avatar, AvatarFallback, AvatarGroup, AvatarImage } from "@/components/ui/avatar";

const people = ["AC", "MK", "JS", "RT", "LB", "PN"];

// An inline "photo" so the demo has no network dependency. Use any image URL in your app.
const photo =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a59"/><stop offset="1" stop-color="#e3192b"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" opacity=".9"/><path d="M12 60c3-12 12-18 20-18s17 6 20 18z" fill="#fff" opacity=".9"/></svg>`,
  );

export default function AvatarDemo() {
  return (
    <div className="grid justify-items-center gap-8">
      <div className="flex items-end gap-5">
        <Avatar size="sm" status="online"><AvatarFallback>AC</AvatarFallback></Avatar>
        <Avatar status="away">
          <AvatarImage src={photo} alt="Sam Carter" />
          <AvatarFallback>RZ</AvatarFallback>
        </Avatar>
        <Avatar size="lg" status="busy"><AvatarFallback>MK</AvatarFallback></Avatar>
        <Avatar status="offline"><AvatarFallback>JS</AvatarFallback></Avatar>
      </div>
      <AvatarGroup max={4}>
        {people.map((p) => (
          <Avatar key={p}><AvatarFallback>{p}</AvatarFallback></Avatar>
        ))}
      </AvatarGroup>
    </div>
  );
}
