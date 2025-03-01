import Link from "next/link";

function CategoryCard({ category }:any) {
  return (
    <Link
      href={`/?category=${encodeURIComponent(category.slug)}`}
      className="block "
    >
      <div className="relative rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300  border border-gray-50/20 ">
        <img
          src={category.img}
          alt={category.name}
          className="w-full h-20  lg:h-28 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50  flex items-center justify-center ">
          <h3 className="text-white text-xl font-semibold">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
