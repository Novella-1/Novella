function BookDetailPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1>Book Detail: {params.id}</h1>
    </div>
  );
}

export default BookDetailPage;
