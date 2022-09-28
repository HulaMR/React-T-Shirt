import Card from '../components/Card';

function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorite,
  onAddToCart,
  isLoading
}) {

  const renderItems = () => {
    const filtredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onPlus={(obj) => onAddToCart(obj)}
        onFavorite={(obj) => onAddToFavorite(obj)}

        loading={isLoading}
        {...item}
      />
    ))
  };

  return (
    <div className="content  p-40">
      <div className="d-flex align-center mb-30 justify-between">
        <h1>{searchValue ? `Пошук: ${searchValue}` : 'Всі товари'} </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="search" />
          {searchValue && <img onClick={() => setSearchValue('')} className="clear cu-p" src="/img/remove-1.svg" alt="remove" />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук" />
        </div>
      </div>
      <div className="d-flex flex-wrap">
        {
          renderItems()
        }


      </div>
    </div>
  );
}

export default Home;