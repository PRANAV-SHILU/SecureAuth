import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { contactService } from "../../services/contactService";
import { User, Image, Play, ChevronDown, ChevronUp, ExternalLink, Send, Loader2, X } from "lucide-react";

const RESPONSE_MAX_LENGTH = 1000;

const CATEGORY_STYLES = {
  general:    { bg: "rgba(6,182,212,0.12)", color: "#06b6d4", label: "General" },
  feedback:   { bg: "rgba(59,130,246,0.12)",  color: "#60a5fa", label: "Feedback" },
  suggestion: { bg: "rgba(16,185,129,0.12)",  color: "#34d399", label: "Suggestion & Improvement" },
  issue:      { bg: "rgba(249,115,22,0.12)",  color: "#fb923c", label: "Issue & Bug Report" },
  security:   { bg: "rgba(239,68,68,0.12)",   color: "#ef4444", label: "Security Concern" },
  inquiry:    { bg: "rgba(139,92,246,0.12)",  color: "#a78bfa", label: "Hiring / Business Inquiry" },
};

function formatTime(dateStr) {
  const date = new Date(dateStr);
  const diff = Date.now() - date.getTime();
  const m = Math.floor(diff / 60000);
  let relative;
  if (m < 60) relative = `${m}m ago`;
  else {
    const h = Math.floor(m / 60);
    if (h < 24) relative = `${h}h ago`;
    else relative = `${Math.floor(h / 24)}d ago`;
  }
  const exact = date.toLocaleString(undefined, {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true,
  });
  return { relative, exact };
}

function Avatar({ user }) {
  if (user?.profileImage) {
    return <img src={user.profileImage} alt={user.username} className="w-10 h-10 rounded-full object-cover" />;
  }
  const initials = user?.username
    ? user.username.slice(0, 2).toUpperCase()
    : "?";
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
      style={{ background: "linear-gradient(135deg, var(--primary-500), #7c3aed)" }}
    >
      {initials}
    </div>
  );
}

function MediaSection({ images = [], video }) {
  const [lightbox, setLightbox] = useState(null); // index

  if (!images.length && !video) {
    return (
      <div className="text-[11px] italic opacity-50 mt-3" style={{ color: "var(--text-muted)" }}>
        No media attached
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-2 mt-3">
      {/* Image thumbnails */}
      {images.map((src, i) => (
        <button
          key={i}
          onClick={() => setLightbox(i)}
          className="cursor-pointer relative w-14 h-14 rounded-lg overflow-hidden border shrink-0 hover:opacity-80 transition-opacity"
          style={{ borderColor: "var(--border-light)" }}
        >
          <img src={src} alt="" className="w-full h-full object-cover" />
        </button>
      ))}

      {/* Video thumbnail (Loads image frame at 1s instead of heavy video player) */}
      {video && (
        <button
          onClick={() => setLightbox('video')}
          className="cursor-pointer relative w-14 h-14 rounded-lg overflow-hidden border shrink-0 hover:opacity-80 transition-opacity bg-black flex items-center justify-center"
          style={{ borderColor: "var(--border-light)" }}
        >
          <img 
            src={video.replace("/upload/", "/upload/so_1/").replace(/\.[^/.]+$/, ".jpg")} 
            alt="Video thumbnail" 
            className="absolute inset-0 w-full h-full object-cover opacity-50" 
          />
          <Play size={18} fill="white" className="relative z-10 text-white drop-shadow-md" />
        </button>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
          onClick={() => setLightbox(null)}
        >
          <div className="relative max-w-3xl w-full mx-4 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            {lightbox === 'video' ? (
              <video src={video} controls autoPlay className="w-full rounded-2xl max-h-[80vh] bg-black" />
            ) : (
              <>
                <img src={images[lightbox]} alt="" className="w-full rounded-2xl max-h-[80vh] object-contain" />
                
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox((p) => Math.max(0, p - 1)); }}
                  disabled={lightbox === 0}
                  className="fixed bottom-6 left-4 lg:top-1/2 lg:-translate-y-1/2 lg:left-6 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-white/70 disabled:opacity-30 hover:text-white transition-all bg-black/50 hover:bg-black/80 disabled:hover:bg-black/50 px-4 h-11 rounded-full text-sm font-bold z-50"
                >
                  <span className="text-lg leading-none">←</span> <span className="hidden lg:inline">Prev</span>
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); setLightbox((p) => Math.min(images.length - 1, p + 1)); }}
                  disabled={lightbox === images.length - 1}
                  className="fixed bottom-6 right-4 lg:top-1/2 lg:-translate-y-1/2 lg:right-6 flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed text-white/70 disabled:opacity-30 hover:text-white transition-all bg-black/50 hover:bg-black/80 disabled:hover:bg-black/50 px-4 h-11 rounded-full text-sm font-bold z-50"
                >
                  <span className="hidden lg:inline">Next</span> <span className="text-lg leading-none">→</span>
                </button>

                <span className="fixed bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm font-semibold bg-black/60 px-4 py-1.5 rounded-full z-50">
                  {lightbox + 1} / {images.length}
                </span>
              </>
            )}
            <button
              onClick={() => setLightbox(null)}
              className="fixed top-6 right-6 cursor-pointer text-white hover:text-red-400 text-3xl font-bold leading-none z-50 transition-colors"
            >✕</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactCard({ contact, isAdmin = true }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { name, email, category, message, images, video, response, userId, createdAt } = contact;
  const catStyle = CATEGORY_STYLES[category] || CATEGORY_STYLES.general;
  const isLong = message.length > 140;
  const hasResponse = !!response;

  const charCount = replyText.length;
  const isOverLimit = charCount > RESPONSE_MAX_LENGTH;
  const isReplyEmpty = replyText.trim().length === 0;

  const handleSubmitReply = async () => {
    if (isReplyEmpty || isOverLimit || submitting) return;

    setSubmitting(true);
    try {
      await contactService.respondToContact(contact._id, replyText.trim());
      toast.success("Response sent successfully!");
      setShowReplyForm(false);
      setReplyText("");
      // Refresh the page data
      navigate(window.location.pathname + window.location.search, { replace: true });
    } catch (err) {
      toast.error(err?.response?.data?.message || err?.message || "Failed to send response.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-2xl p-3 xsm:p-4 sm:p-5 border flex flex-col gap-3 transition-shadow hover:shadow-md"
      style={{ backgroundColor: "var(--surface-input)", borderColor: "var(--border-normal)" }}
    >
      {/* Top row: real account info + category + time */}
      <div className={`flex flex-col sm:flex-row sm:items-start ${isAdmin ? "justify-between" : "justify-start"} gap-3 sm:gap-4`}>
      {isAdmin && (
        userId?.username ? (
          <button
            onClick={() => navigate(`/profile/${userId.username}`)}
            className="cursor-pointer flex items-center gap-3 min-w-0 hover:opacity-75 transition-opacity"
          >
            <Avatar user={userId} />
            <div className="min-w-0 text-left">
              <p className="font-bold text-sm truncate flex items-center gap-1" style={{ color: "var(--text-primary)" }}>
                @{userId.username}
                <ExternalLink size={11} style={{ color: "var(--text-muted)" }} />
              </p>
              {userId?.email && (
                <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{userId.email}</p>
              )}
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-3 min-w-0">
            <Avatar user={userId} />
            <p className="font-bold text-sm" style={{ color: "var(--text-muted)" }}>Unknown user</p>
          </div>
        )
      )}

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap"
            style={{ background: catStyle.bg, color: catStyle.color }}
          >
            {catStyle.label || category}
          </span>
          {(() => {
            const t = formatTime(createdAt);
            return (
              <span className="text-xs flex flex-wrap items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                <span className="whitespace-nowrap">{t.relative}</span>
                <span className="opacity-50 hidden xsm:inline">·</span>
                <span className="whitespace-nowrap">{t.exact}</span>
              </span>
            );
          })()}
        </div>
      </div>

      {/* Form details: submitted name + email */}
      <div
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs px-3 py-2 rounded-xl"
        style={{ background: "var(--surface-card)", border: "1px solid var(--border-light)", color: "var(--text-muted)" }}
      >
        <div className="flex items-center gap-1.5 shrink-0">
          <User size={11} />
          <span>Submitted as</span>
          <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>{name}</span>
        </div>
        <span className="hidden sm:inline">·</span>
        <span className="break-all">{email}</span>
      </div>

      {/* Message */}
      <div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: "var(--text-secondary)" }}>
          {isLong && !expanded ? `${message.slice(0, 140)}…` : message}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded((p) => !p)}
            className="flex items-center gap-1 mt-1 text-xs font-semibold"
            style={{ color: "var(--primary-500)" }}
          >
            {expanded ? <><ChevronUp size={13} /> Show less</> : <><ChevronDown size={13} /> Read more</>}
          </button>
        )}
      </div>

      {/* Media */}
      <MediaSection images={images} video={video} />

      {/* Admin response (responded tab) */}
      {response && (
        <div
          className="rounded-xl p-3 text-sm"
          style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#059669" }}
        >
          <p className="text-xs font-semibold mb-1 uppercase tracking-wide opacity-70">Admin responded</p>
          <span className="whitespace-pre-wrap">{response}</span>
        </div>
      )}

      {/* Not responded yet message (user view only) */}
      {!isAdmin && !response && (
        <div
          className="rounded-xl p-3 text-sm"
          style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#d97706" }}
        >
          <p className="text-xs font-semibold mb-1 uppercase tracking-wide opacity-70">Pending</p>
          <span>Not responded yet — we're working on it!</span>
        </div>
      )}

      {/* Reply Form (expands when Respond is clicked) — admin only */}
      {isAdmin && showReplyForm && (
        <div
          className="flex flex-col gap-3 rounded-xl p-4 mt-1"
          style={{
            background: "var(--surface-card)",
            border: "1px solid var(--border-light)",
          }}
        >
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
              {hasResponse ? "Update your reply" : "Write your reply"}
            </p>
            <button
              onClick={() => { setShowReplyForm(false); setReplyText(""); }}
              className="cursor-pointer p-1 rounded-lg hover:bg-white/10 transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <X size={16} />
            </button>
          </div>

          <textarea
            value={replyText}
            onChange={(e) => {
              setReplyText(e.target.value);
              e.target.style.height = "auto";
              e.target.style.height = `${e.target.scrollHeight}px`;
            }}
            maxLength={RESPONSE_MAX_LENGTH + 50}
            placeholder="Type your response to this message..."
            rows={4}
            className="w-full rounded-xl px-4 py-3 text-sm resize-none overflow-hidden outline-none transition-all focus:ring-2"
            style={{
              backgroundColor: "var(--surface-input)",
              border: `1px solid ${isOverLimit ? "#ef4444" : "var(--border-normal)"}`,
              color: "var(--text-primary)",
              focusRingColor: "var(--primary-500)",
            }}
          />

          <div className="flex items-center justify-between">
            <span
              className="text-xs font-semibold tabular-nums"
              style={{
                color: isOverLimit
                  ? "#ef4444"
                  : charCount > RESPONSE_MAX_LENGTH * 0.9
                    ? "#f59e0b"
                    : "var(--text-muted)",
              }}
            >
              {charCount} / {RESPONSE_MAX_LENGTH}
            </span>

            <button
              onClick={handleSubmitReply}
              disabled={isReplyEmpty || isOverLimit || submitting}
              className="cursor-pointer flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-xl transition-all hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: isReplyEmpty || isOverLimit ? "var(--text-muted)" : "var(--primary-500)",
                color: "#fff",
              }}
            >
              {submitting ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={15} />
                  {hasResponse ? "Update Reply" : "Send Reply"}
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Respond / Update button (hidden when form is open) — admin only */}
      {isAdmin && !showReplyForm && (
        <div className="flex justify-end">
          <button
            onClick={() => { setReplyText(response || ""); setShowReplyForm(true); }}
            className="cursor-pointer text-sm font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
            style={{ background: "var(--primary-500)", color: "#fff" }}
          >
            {hasResponse ? "Update Response →" : "Respond →"}
          </button>
        </div>
      )}
    </div>
  );
}

