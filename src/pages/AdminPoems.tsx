import { useEffect } from "react";

const AdminPoems = () => {
  useEffect(() => {
    // Redirect to Sveltia CMS admin page
    window.location.href = "/admin/index.html";
  }, []);

  return (
    <main className="pt-24 md:pt-28">
      <section className="section-padding">
        <div className="mx-auto max-w-md text-center px-5 md:px-8 lg:px-12">
          <p className="font-body text-muted-foreground">Se redirecționează către panoul CMS...</p>
        </div>
      </section>
    </main>
  );
};

export default AdminPoems;
