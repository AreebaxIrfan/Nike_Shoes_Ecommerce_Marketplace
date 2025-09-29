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
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li key={index}>
            <button
              type="button"
              className={`w-full text-left cursor-pointer hover:underline ${
                selectedCategory === category ? "text-black font-semibold" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>

      <hr className="my-4" />

      {/* Sort Dropdown */}
      <div>
        <h3 className="font-semibold">Sort By</h3>
        <select
          className="border rounded p-1 text-sm mt-2 w-full"
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
