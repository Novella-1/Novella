function CategoryPage({ params }: { params: { slug: string } }) {
  return <h1>Категория: {params.slug}</h1>;
}

export default CategoryPage;
