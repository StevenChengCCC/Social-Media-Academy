export default function Video({ title, src }) {
  return (
    <div className="yt">
      <div className="yt-frame">
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
      <div className="yt-caption">{title}</div>
    </div>
  );
}
