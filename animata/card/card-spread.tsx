import Notes, { NotesCard } from "@/animata/widget/notes";
import ShoppingList from "@/animata/widget/shopping-list";

import "./card-spread.css";

function Reminders() {
  return (
    <ShoppingList
      title="Reminders"
      items={[
        { id: "museum", title: "Book museum tickets" },
        { id: "groceries", title: "Buy groceries", checked: true },
        { id: "mom", title: "Call mom" },
      ]}
    />
  );
}

function RemodelNotes() {
  return (
    <NotesCard title="Kitchen Remodel Ideas">
      <div>Install a farmhouse sink for a rustic touch</div>
      <div>Use classic subway tiles</div>
      <div>Add an island for extra counter space</div>
      <div>Opt for open shelving</div>
    </NotesCard>
  );
}

const cards = [
  { id: "notes", component: Notes },
  { id: "shopping-list", component: ShoppingList },
  { id: "remodel-notes", component: RemodelNotes },
  { id: "reminders", component: Reminders },
] as const;

export default function CardSpread() {
  return (
    <div className="card-spread flex min-h-96 w-full flex-col items-center justify-center gap-4">
      <label className="card-spread-open">
        <input type="checkbox" className="card-spread-toggle" />
        <span className="card-spread-open__text card-spread-open__text--expand">Spread cards</span>
        <span className="card-spread-open__text card-spread-open__text--collapse">Stack cards</span>
      </label>

      <div className="card-spread-stage group/stack">
        <div className="card-spread-container">
          {cards.map((item) => {
            const Card = item.component;

            return (
              <div key={item.id} className="card-spread-item w-48 shrink-0">
                <div className="card-spread-item__hover">
                  <div className="card-spread-item__internal">
                    <Card />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
