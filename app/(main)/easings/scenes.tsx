import {
  ArrowUpDown,
  Bell,
  Check,
  ChevronDown,
  Heart,
  Inbox,
  type LucideIcon,
  Search,
  Settings,
  X,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";

export type SceneCategory = "overlays" | "navigation" | "controls" | "content";

export const CATEGORY_LABELS: Record<SceneCategory, string> = {
  overlays: "Overlays",
  navigation: "Navigation",
  controls: "Controls",
  content: "Content",
};

export type Scene = {
  id: string;
  title: string;
  category: SceneCategory;
  render: (open: boolean) => ReactNode;
};

/** Decorative stand-ins for real controls. The scene card itself is the button. */
function Fake({ icon: Icon, children }: { icon?: LucideIcon; children?: ReactNode }) {
  return (
    <span className="ez-fake">
      {Icon ? <Icon aria-hidden="true" className="size-3.5" /> : null}
      {children}
    </span>
  );
}

const Line = ({ w, strong }: { w: string; strong?: boolean }) => (
  <span className="ez-line" data-strong={strong ? "" : undefined} style={{ width: w }} />
);

export const SCENES: Scene[] = [
  {
    id: "dropdown",
    title: "Dropdown",
    category: "overlays",
    render: (open) => (
      <div className="ez-stage ez-dropdown" data-open={open || undefined}>
        <Fake icon={ArrowUpDown}>Sort by</Fake>
        <div className="ez-menu">
          {["Newest", "Most popular", "Price, low to high", "Price, high to low"].map(
            (item, index) => (
              <span key={item} className="ez-menu__item" data-active={index === 1 || undefined}>
                {item}
                {index === 1 ? <Check aria-hidden="true" className="size-3.5" /> : null}
              </span>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    id: "dialog",
    title: "Dialog",
    category: "overlays",
    render: (open) => (
      <div className="ez-stage ez-dialog" data-open={open || undefined}>
        <div className="ez-page">
          <Line w="40%" strong />
          <Line w="85%" />
          <Line w="70%" />
          <Line w="78%" />
        </div>
        <div className="ez-scrim" />
        <div className="ez-dialog__panel">
          <strong>Delete project?</strong>
          <span>This removes 24 files for everyone on the team.</span>
          <div className="ez-dialog__actions">
            <Fake>Cancel</Fake>
            <span className="ez-fake ez-fake--danger">Delete</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "toast",
    title: "Toast",
    category: "overlays",
    render: (open) => (
      <div className="ez-stage ez-toast" data-open={open || undefined}>
        <div className="ez-page">
          <Line w="55%" strong />
          <Line w="90%" />
          <Line w="65%" />
        </div>
        <div className="ez-toast__card">
          <span className="ez-toast__icon">
            <Check aria-hidden="true" className="size-3.5" />
          </span>
          <span>
            <strong>Invoice sent</strong>
            <span>Mara will get it in a minute.</span>
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "drawer",
    title: "Drawer",
    category: "navigation",
    render: (open) => (
      <div className="ez-stage ez-drawer" data-open={open || undefined}>
        <div className="ez-page">
          <Line w="35%" strong />
          <Line w="80%" />
          <Line w="72%" />
        </div>
        <div className="ez-scrim" />
        <div className="ez-drawer__panel">
          <div className="ez-drawer__head">
            <strong>Filters</strong>
            <X aria-hidden="true" className="size-3.5" />
          </div>
          {["In stock", "Free delivery", "On sale"].map((item, index) => (
            <span key={item} className="ez-check">
              <span className="ez-check__box" data-on={index !== 1 || undefined} />
              {item}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "tabs",
    title: "Tabs",
    category: "navigation",
    render: (open) => (
      <div className="ez-stage ez-tabs" data-open={open || undefined}>
        <div className="ez-tabs__list">
          <span className="ez-tabs__indicator" />
          {["Overview", "Activity", "Settings"].map((tab, index) => (
            <span
              key={tab}
              className="ez-tabs__tab"
              data-active={(open ? index === 2 : index === 0) || undefined}
            >
              {tab}
            </span>
          ))}
        </div>
        <div className="ez-page ez-page--flat">
          <Line w="60%" strong />
          <Line w="88%" />
        </div>
      </div>
    ),
  },
  {
    id: "page",
    title: "Page transition",
    category: "navigation",
    render: (open) => (
      <div className="ez-stage ez-pages" data-open={open || undefined}>
        <div className="ez-pages__page ez-pages__page--from">
          <span className="ez-pages__label">
            <Inbox aria-hidden="true" className="size-3.5" /> Inbox
          </span>
          <Line w="80%" />
          <Line w="64%" />
          <Line w="72%" />
        </div>
        <div className="ez-pages__page ez-pages__page--to">
          <span className="ez-pages__label">Re: Launch plan</span>
          <span className="ez-pages__hero" />
          <Line w="86%" />
          <Line w="58%" />
        </div>
      </div>
    ),
  },
  {
    id: "toggle",
    title: "Switch",
    category: "controls",
    render: (open) => (
      <div className="ez-stage ez-switch" data-open={open || undefined}>
        <span className="ez-switch__row">
          <Bell aria-hidden="true" className="size-4" />
          Notifications
          <span className="ez-switch__track">
            <span className="ez-switch__thumb" />
          </span>
        </span>
        <span className="ez-switch__row ez-switch__row--muted">
          <Settings aria-hidden="true" className="size-4" />
          Weekly digest
          <span className="ez-switch__track">
            <span className="ez-switch__thumb" />
          </span>
        </span>
      </div>
    ),
  },
  {
    id: "accordion",
    title: "Accordion",
    category: "controls",
    render: (open) => (
      <div className="ez-stage ez-accordion" data-open={open || undefined}>
        <div className="ez-accordion__item">
          <span className="ez-accordion__head">
            Can I change plans later?
            <ChevronDown aria-hidden="true" className="ez-accordion__chevron size-3.5" />
          </span>
          <div className="ez-accordion__body">
            <div>
              <span>
                Yes. Switch at any time from Billing, and we prorate the difference on your next
                invoice.
              </span>
            </div>
          </div>
        </div>
        <div className="ez-accordion__item">
          <span className="ez-accordion__head">
            Do you offer refunds?
            <ChevronDown aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "search",
    title: "Search field",
    category: "controls",
    render: (open) => (
      <div className="ez-stage ez-search" data-open={open || undefined}>
        <div className="ez-search__field">
          <Search aria-hidden="true" className="size-3.5" />
          <span className="ez-search__text">Search projects</span>
          <span className="ez-search__kbd">⌘K</span>
        </div>
      </div>
    ),
  },
  {
    id: "list",
    title: "List reveal",
    category: "content",
    render: (open) => (
      <div className="ez-stage ez-list" data-open={open || undefined}>
        {["Design review", "Ship billing fixes", "Interview: Platform", "Quarterly planning"].map(
          (item, index) => (
            <span key={item} className="ez-list__row" style={{ "--i": index } as CSSProperties}>
              <span className="ez-list__dot" />
              {item}
              <span className="ez-list__time">{["9:30", "11:00", "14:00", "16:30"][index]}</span>
            </span>
          ),
        )}
      </div>
    ),
  },
  {
    id: "card",
    title: "Card hover",
    category: "content",
    render: (open) => (
      <div className="ez-stage ez-card" data-open={open || undefined}>
        <div className="ez-card__frame">
          <div className="ez-card__media" />
          <div className="ez-card__body">
            <strong>Studio lamp</strong>
            <span>$148</span>
          </div>
          <span className="ez-card__like">
            <Heart aria-hidden="true" className="size-3.5" />
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "counter",
    title: "Number change",
    category: "content",
    render: (open) => (
      <div className="ez-stage ez-counter" data-open={open || undefined}>
        <span className="ez-counter__label">Revenue this month</span>
        <span className="ez-counter__value" aria-hidden="true">
          $
          {["1", "2", "4", "8"].map((from, index) => {
            const to = ["1", "9", "6", "2"][index];
            return (
              <span key={from + to + index.toString()} className="ez-counter__digit">
                <span className="ez-counter__reel" style={{ "--i": index } as CSSProperties}>
                  <span>{from}</span>
                  <span>{to}</span>
                </span>
              </span>
            );
          })}
        </span>
        <span className="ez-counter__delta">+52% from last month</span>
      </div>
    ),
  },
];
