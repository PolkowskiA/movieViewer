import { useState } from "react";
import StarIcon from "../../components/icons/StarIcon";

type MyRatingProps = {
  vote: number | null;
  onChange: (value: number | null) => void;
};

export function MyRating({ vote, onChange }: Readonly<MyRatingProps>) {
  const [open, setOpen] = useState(false);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(vote);

  return (
    <>
      <button
        className="flex w-fit cursor-pointer items-center gap-2 rounded-full p-1 hover:bg-gray-500"
        onClick={() => {
          setOpen(true);
          setSelected(vote);
        }}
      >
        <span className="text-xl font-semibold">
          {vote ? "Moja ocena:" : "Oceń:"}
        </span>
        <div className="relative">
          <StarIcon width={64} fill="#fac123" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-black">
            {vote}
          </span>
        </div>
      </button>
      {open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
          <div
            className="relative w-90 rounded-xl bg-neutral-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 cursor-pointer text-gray-400 hover:text-white"
              aria-label="Close"
            >
              ✕
            </button>
            <div className="flex justify-center gap-2 py-6">
              {Array.from({ length: 10 }, (_, i) => {
                const starValue = i + 1;
                const filled =
                  hoverValue !== null
                    ? starValue <= hoverValue
                    : starValue <= (selected ?? 0);

                return (
                  <button
                    key={starValue}
                    onMouseEnter={() => setHoverValue(starValue)}
                    onMouseLeave={() => setHoverValue(null)}
                    onClick={() => setSelected(starValue)}
                    className="cursor-pointer bg-transparent"
                  >
                    <StarIcon
                      className="h-6 w-6"
                      fill={filled ? "#fac123" : "none"}
                      stroke={filled ? "#fac123" : "#666"}
                    />
                  </button>
                );
              })}
            </div>
            <div className="flex justify-center gap-2">
              {vote !== null && (
                <button
                  className="w-full max-w-55 rounded-full bg-red-400 py-2 font-semibold text-black hover:bg-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!selected}
                  onClick={() => {
                    onChange(null);
                    setOpen(false);
                  }}
                >
                  Usuń ocenę
                </button>
              )}

              <button
                className="w-full max-w-55 rounded-full bg-yellow-400 py-2 font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                disabled={!selected}
                onClick={() => {
                  onChange(selected);
                  setOpen(false);
                }}
              >
                Oceń
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
