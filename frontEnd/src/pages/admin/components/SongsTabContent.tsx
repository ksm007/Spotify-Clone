import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Music } from "lucide-react";
import SongsTable from "./SongsTable";
import AddSongDialog from "./AddSongDialog";

const SongsTabContent = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <div className=" flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Music className="size-5 text-emerald-500"></Music>
                Songs Library
              </CardTitle>
              <CardDescription>Manage your music</CardDescription>
            </div>
            <AddSongDialog />
          </div>
        </CardHeader>
        <CardContent>
          <SongsTable/>
        </CardContent>
      </Card>
    </div>
  );
};

export default SongsTabContent;
