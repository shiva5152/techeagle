import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import type { TActivity } from "../types/activity";
import instance from "../utils/axios";
import useAuth from "../components/hooks/useAuth";

const Home = () => {
  const [activities, setActivities] = useState<TActivity[]>([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchActivities = async () => {
      if (user === null) return;
      setLoading(true);
      const { data } = await instance.get(`/user/activity/${user._id}`);
      setActivities(data.activities);
      setLoading(false);
    };

    fetchActivities();
  }, [user]);
  return (
    <main className="dark:bg-gray-900 h-scree w-full justify-between ">
      <Navbar setActivities={setActivities} />
      <section className="flex flex-col h-[88vh] items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Table
          setActivities={setActivities}
          activities={activities}
          loading={loading}
        />
      </section>
    </main>
  );
};

export default Home;
