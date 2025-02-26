import Image from "next/image"
import Link from "next/link"

type EntertainmentItem = {
  id: string
  title: string
  image: string
  category: string
}

const entertainmentItems: EntertainmentItem[] = [
  { id: "1", title: "Premier League", image: "/images/image.png", category: "Football" },
  { id: "2", title: "La Liga", image: "/images/la-liga.jpg", category: "Football" },
  { id: "3", title: "Stranger Things", image: "/images/stranger-things.jpg", category: "TV Series" },
  { id: "4", title: "The Godfather", image: "/images/godfather.jpg", category: "Movies" },
  { id: "5", title: "Game of Thrones", image: "/images/got.jpg", category: "TV Series" },
  { id: "6", title: "CNN", image: "/images/cnn.jpg", category: "Channels" },
  { id: "7", title: "Champions League", image: "/images/champions-league.jpg", category: "Football" },
  { id: "8", title: "Inception", image: "/images/inception.jpg", category: "Movies" },
  { id: "9", title: "Breaking Bad", image: "/images/breaking-bad.jpg", category: "TV Series" },
  { id: "10", title: "BBC", image: "/images/bbc.jpg", category: "Channels" },
  { id: "11", title: "Bundesliga", image: "/images/bundesliga.jpg", category: "Football" },
  { id: "12", title: "The Crown", image: "/images/the-crown.jpg", category: "TV Series" },
]

export default function EntertainmentGrid() {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Popular Entertainment</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {entertainmentItems.map((item) => (
            <Link key={item.id} href={`/entertainment/${item.id}`} className="group">
              <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75 transition-opacity duration-300"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900 group-hover:underline">{item.title}</h3>
                <p className="text-xs text-gray-500">{item.category}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

