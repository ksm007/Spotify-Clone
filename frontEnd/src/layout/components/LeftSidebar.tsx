import PlaylistSkeleton from "@/components/Skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  //data fetching => zustand

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);
console.log({albums});

  return (
    <div className="h-full flex flex-col gap-2">
      <div className="rounded-s-lg bg-zinc-800 p-4">
        <div className="space-y-2">
          <Link
            to={"/"}
            className={cn( 
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-900",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5"></HomeIcon>
            <span className="hidden md:inline">Home</span>
          </Link>
        </div>
        <SignedIn>
          <Link
            to={"/chat"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-900",
              })
            )}
          >
            <MessageCircle className="mr-2 size-5"></MessageCircle>
            <span className="hidden md:inline">Messages</span>
          </Link>
        </SignedIn>
      </div>
      {/* Library Section */}
      <div className="rounded-s-lg bg-zinc-800 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2"></Library>
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? <PlaylistSkeleton /> : (
                albums.map((album) => (
                    <Link to={`/albums/${album._id}`} key={album._id}
                    className="p-2 hover:bg-zinc-900 rounded-md flex items-center gap-3 group cursor-pointer">
                        <img src={album.imageUrl} alt="Playlist image"
                        className="size-12 rounded-md flex-shrink-0 object-cover" />
                        <div className="flex-1 min-w-0 hidden md:block">
                            <p className="font-medium truncate"> {album.title}</p>
                            <p className="font-medium text-zinc-400 truncate">Album • {album.artist}</p>
                        </div>
                    </Link>
                ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
