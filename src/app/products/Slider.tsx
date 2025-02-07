interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  selectedSort: string;
  setSelectedSort: (sort: string) => void;
}

const FilterSidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  isSidebarOpen,
  selectedSort,
  setSelectedSort,
}: FilterSidebarProps) => {
  return (
    <aside
      className={`absolute sm:fixed md:static bg-white z-40 w-3/4 md:w-1/4 p-4 border-r transition-transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0`}
    >
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer hover:underline ${
              selectedCategory === category ? 'text-black font-semibold' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <div>
        <h3 className="font-semibold cursor-pointer">Sort By</h3>
        <select
          className="border rounded p-1 text-sm mt-2"
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
        >
          <option value="default">Sort By</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;



