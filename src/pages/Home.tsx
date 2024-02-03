import { collection, getDocs } from "firebase/firestore";
import imagesLoaded from "imagesloaded";
import Masonry from "masonry-layout";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";
import iceCreamCone from "../assets/images/ice_cream_cone.jpg";
import iceCreamSprinkles from "../assets/images/ice_cream_sprinkles.jpg";
import AddAnnouncementForm from "../components/AddAnnouncementForm";
import AddFlavorForm from "../components/AddFlavorForm";
import { AnnouncementBanner } from "../components/AnnouncementBanner";
import FlavorList from "../components/FlavorList";
import { auth, firestore } from "../firebase";

interface Flavor {
  id: string;
  name: string;
  description: string;
  featured: boolean;
  outOfStock: boolean;
  hidden: boolean;
  category: string;
}

interface Announcement {
  id: string;
  title: string;
  description: string;
}

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home: React.FC = () => {
  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const gridRef = useRef(null);
  const flavorCategories = flavors.reduce<{ [category: string]: Flavor[] }>(
    (acc, flavor) => {
      if (!acc[flavor.category]) {
        acc[flavor.category] = [];
      }
      acc[flavor.category].push(flavor);
      return acc;
    },
    {}
  );
  useEffect(() => {
    const grid = gridRef.current;

    const masonryInstance = new Masonry(grid, {
      itemSelector: ".grid-item",
      fitWidth: true,

      gutter: 0,
    });

    imagesLoaded(grid, function () {
      masonryInstance.layout();
    });
    return () => {
      masonryInstance.destroy();
    };
  }, [flavors]);

  const handleFlavorDelete = (flavorId: string) => {
    setFlavors(flavors.filter((flavor) => flavor.id !== flavorId));
  };

  const fetchAnnouncements = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(firestore, "announcements")
      );
      const fetchedAnnouncements: Announcement[] = querySnapshot.docs.map(
        (doc) => ({
          id: doc.id,
          title: doc.data().title,
          description: doc.data().description,
        })
      );
      setAnnouncements(fetchedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const idTokenResult = await auth.currentUser?.getIdTokenResult();
        setIsAdmin(!!idTokenResult?.claims?.isAdmin || false);
      } catch (error) {
        console.error("Error checking admin status:", error);
      }
    };

    checkAdminStatus();
  }, []);

  const hasAnnouncement = announcements.length > 0;

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "flavors"));
        const flavorsList: Flavor[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          featured: doc.data().featured,
          description: doc.data().description,
          outOfStock: doc.data().outOfStock,
          hidden: doc.data().hidden,
          category: doc.data().category,
        }));
        setFlavors(flavorsList);
      } catch (error) {
        console.error("Error fetching flavors:", error);
      }
    };

    fetchFlavors();
  }, []);

  const handleFlavorUpdate = (flavorId: string, data: Partial<Flavor>) => {
    setFlavors((currentFlavors) =>
      currentFlavors.map((flavor) =>
        flavor.id === flavorId ? { ...flavor, ...data } : flavor
      )
    );
  };

  const handleFlavorAdd = (newFlavor: Flavor) => {
    setFlavors([...flavors, newFlavor]);
  };

  return (
    <div>
      <BannerContainer>
        {hasAnnouncement ? (
          <AnnouncementBanner
            isAdmin={isAdmin}
            announcement={announcements[0]}
            fetchAnnouncements={fetchAnnouncements}
          />
        ) : isAdmin ? (
          <AddAnnouncementForm onAnnouncementAdded={fetchAnnouncements} />
        ) : null}
      </BannerContainer>
      <BannerContainer>
        <div className="grid" ref={gridRef}>
          <img
            className="grid-item"
            src={iceCreamCone}
            style={{ maxWidth: "min(100%, 600px)" }}
          />
          {Object.entries(flavorCategories).map(([category, flavors]) => (
            <FlavorList
              isAdmin={isAdmin}
              key={category}
              category={category}
              flavors={flavors}
              onFlavorUpdate={handleFlavorUpdate}
              onFlavorDelete={handleFlavorDelete}
            />
          ))}
          <img
            className="grid-item"
            src={iceCreamSprinkles}
            style={{ maxWidth: "min(100%, 600px)" }}
          />
        </div>
      </BannerContainer>
      {isAdmin && <AddFlavorForm onFlavorAdd={handleFlavorAdd} />}
    </div>
  );
};

export default Home;
