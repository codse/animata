import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";

interface CardType {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  customStyle?: string;
  link?: string;
}

const cards = [
  {
    id: "card1",
    title: "Liongron Bay",
    description: "The darkness of the falcons heart that rendered the princes at bay.",
    image:
      "https://assets.lummi.ai/assets/Qma1aBRXFsApFohRJrpJczE5QXGY6HhHKz24ybuw1khbou?auto=format&w=400",
    link: "http://www.animata.com",
    type: "SimpleCard",
    customStyle: "bg-slate-300", //it will be used on the className property
    collection: [],
  },
  {
    id: "card2",
    title: "The Film Collection",
    subtitle: "An affirmed collection comprised of Staff picked new Films.",
    description: "Explore the latest and most acclaimed staff-selected films.",
    image:
      "https://assets.lummi.ai/assets/QmZBpAeh18DHxVNEEcJErt1UXGjZYCedSidJ6cybrDZdeS?auto=format&w=400",
    type: "FilmCollectionCard",
    customStyle: "bg-white",
    collection: [
      {
        title: "A Twisted Tails - The enchanted forests of Argentina.",
        image:
          "https://assets.lummi.ai/assets/QmSxHGeLuiXMzUSFM9hhVJToRXVeQCBEtno96zgAXB3uVN?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
      {
        title: "Rocky Road - Stories on the road in the south.",
        image:
          "https://assets.lummi.ai/assets/QmXm6HVi3wwGy3jaCmECfoL8AULPerjQQh6abKTVhFMewK?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
      {
        title: "Duango Ridley - Presence of an interior essence of calm.",

        image:
          "https://assets.lummi.ai/assets/QmbMZFEfk2qwQkkmXYncpvHapkNQF5HuTrcascJC7edpfW?auto=format&w=400",
        link: "http://www.animata.com",
        duration: "3:42",
      },
    ],
  },
  {
    id: "card3",
    title: "Third Element",
    description: "The mystery and magic of elements unknown in the heart of nature.",
    image:
      "https://assets.lummi.ai/assets/QmaUXibkkKYu6Y3TzwE71ytVrPqecXiG4URAPZuqqzxz6R?auto=format&w=400",
    link: "http://www.animata.com",
    type: "SimpleCard",
    customStyle: "bg-amber-300",
    collection: [],
  },
];
interface CardComponentType extends CardType {
  collection?: CardType[];
  isSelected?: boolean;
  layoutId?: string;
  onHover?: (cardId: string) => void;
  onHoverOut?: () => void;
}

const getZoomInVariant = () => ({
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
});
const Card: React.FC<CardComponentType> = ({
  image,
  title,
  description,
  isSelected,
  layoutId,
  customStyle,
  collection,
  onHover,
  onHoverOut,
}) => {
  const variants = getZoomInVariant();
  const [expandBg, setExpandBg] = useState(false);
  const isCollection = Array.isArray(collection) && collection.length > 0;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (isSelected) {
      if (isCollection) {
        timer = setTimeout(() => {
          setExpandBg(true);
        }, 1000); // delay
      } else {
        setExpandBg(true);
      }
    } else {
      setExpandBg(false);
    }

    return () => clearTimeout(timer);
  }, [isSelected, isCollection]);

  return (
    <motion.div
      layoutId={layoutId}
      className={`origin-center cursor-pointer ${
        expandBg ? "absolute inset-0 z-50 w-full" : "relative z-0 h-64 w-60"
      } ${isSelected ? "z-50" : "z-0"}`}
      onMouseEnter={() => onHover && onHover(layoutId || "")}
      onMouseLeave={onHoverOut}
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", duration: 0.5 }}
      exit="exit"
    >
      {isCollection ? (
        <FilmCollection
          isExpanded={expandBg}
          isSelected={isSelected ?? false}
          collection={collection || []}
        />
      ) : (
        <ImageCard
          title={title}
          image={image}
          description={description}
          isSelected={isSelected}
          customStyle={customStyle}
        />
      )}
    </motion.div>
  );
};

const ImageCard: React.FC<CardComponentType> = ({
  image,
  title,
  description,
  isSelected,
  customStyle,
}) => (
  <div
    className={`flex h-full w-full flex-col justify-start overflow-hidden rounded-md ${customStyle ? customStyle : "bg-white"} `}
  >
    <motion.img
      src={image}
      alt={title}
      className={`h-3/4 ${isSelected ? "w-full object-cover" : "h-48 w-full object-cover"}`}
      whileHover={!isSelected ? { scale: 1.05 } : {}}
      transition={{ duration: 0.5 }}
    />
    <motion.div
      className={`h-1/4 p-2 ${customStyle} flex w-full flex-col items-center justify-center`}
    >
      <p className={`text-center ${isSelected ? "text-lg" : "text-xs"}`}>
        <span className="font-bold">{title}: </span> {description}
      </p>
    </motion.div>
  </div>
);
// Helper function to generate random values within a range
const getRandom = (min: number, max: number) => Math.random() * (max - min) + min;

interface FilmCollectionProps {
  isSelected: boolean;
  isExpanded: boolean;
  collection: {
    title: string;
    image: string;
    link?: string;
    duration?: string;
  }[];
}

const FilmCollection: React.FC<FilmCollectionProps> = ({ isSelected, collection, isExpanded }) => {
  const cardControls = useAnimation();
  const collectionControls = useAnimation();
  const backgroundControls = useAnimation();
  const headlineControls = useAnimation();
  const scopeRef = useRef<HTMLDivElement>(null);

  const baseY = -30;

  // Memoized initial state for the cards
  const initialCards = useMemo(() => {
    return (index: number) => ({
      scale: 0.5,
      rotate: `${index === 0 ? -15 : index === 1 ? 0 : 15}deg`,
      x: index === 0 ? -20 : index === 1 ? 5 : 15,
      zIndex: collection.length - index,
      top: `${baseY}px`,
      borderRadius: "8px",
      y: getRandom(1, 10),
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [collection.length, baseY]);

  // Trigger animations based on isSelected and isExpanded
  useEffect(() => {
    const animateSequence = async () => {
      if (isExpanded) {
        cardControls.set((index: number) => ({
          y: 200,
          rotate: 0,
          scale: 1,
          x: index === 0 ? 80 : index === 1 ? 290 : 510,
          transition: {
            delay: index === 0 ? 2 : index === 1 ? 2.6 : 2.8,
            duration: 0.05,
            ease: "easeInOut",
          },
        }));
        backgroundControls.set({
          height: "100%",
          width: "100%",
          origin: "center center",
          transition: { duration: 0.5, ease: "easeInOut" },
        });

        await headlineControls.start({
          top: 60,
          scale: 1.6,
        });
      }
      if (isSelected) {
        await cardControls.start((index: number) => ({
          scale: 1,
          zIndex: 50 - index,
          delay: index === 0 ? 0.3 : index * 0.1,
          transition: { duration: 0.4, ease: "easeInOut" },
        }));
      } else {
        headlineControls.start({
          top: 0,
          scale: 1,
          transition: { duration: 0.2, ease: "easeOut" },
        });
        cardControls.set((index: number) => initialCards(index));

        backgroundControls.set({
          height: "auto",
          width: "auto",
          transition: { duration: 0.6, ease: "easeOut" },
        });
      }
    };

    animateSequence();
  }, [
    isSelected,
    isExpanded,
    cardControls,
    backgroundControls,
    collectionControls,
    headlineControls,
    initialCards,
  ]);

  return (
    <motion.section
      className="relative rounded-lg bg-purple-300"
      animate={backgroundControls}
      ref={scopeRef}
    >
      <div className="flex flex-col items-center justify-around">
        <motion.div
          className={`relative flex w-full flex-col items-start ${isExpanded ? "" : "min-h-36"}`}
        >
          {collection?.map((film, index) => (
            <motion.div
              key={index}
              id={`card-${index}`}
              className="absolute h-52 w-48 overflow-hidden rounded-lg bg-white shadow-lg"
              initial={initialCards(index)}
              animate={cardControls}
              custom={index}
            >
              <img
                src={film.image}
                alt={film?.title}
                className="h-3/5 w-full rounded-t-lg object-cover"
              />
              <div className="flex flex-1 flex-col justify-center p-3 text-center">
                <p className="text-xs leading-tight text-gray-600">{film?.title}</p>
                <p className="pt-2 text-[0.60rem] leading-tight text-gray-500">
                  Watch - {film?.duration}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div animate={headlineControls} className="relative w-full p-3 text-center">
          <h1 className="text-bold text-ellipsis text-lg text-gray-800">The Film Collection</h1>
          <p className="text-sm text-gray-600">
            An affirmed collection comprised of Staff picked new Films.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

const ProductWhatsNew: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  return (
    <div className="w-full min-w-[600px] bg-gray-100 p-4">
      <h1 className="my-8 text-center text-4xl font-bold">What&apos;s New</h1>
      <p className="mb-10 text-center">
        Explore the latest updates and featured content, curated just for you.
      </p>

      <div className="flex gap-8 px-20">
        <AnimatePresence>
          {cards.map((card) => (
            <Card
              key={card.id}
              layoutId={card.id}
              title={card.title}
              description={card.description}
              customStyle={card.customStyle}
              image={card.image}
              isSelected={selectedCard === card.id}
              collection={card.collection ? card.collection : []}
              onHover={() => setSelectedCard(selectedCard === card.id ? null : card.id)}
              onHoverOut={() => setSelectedCard(null)}
            />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductWhatsNew;
