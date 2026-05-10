export default function LessonDocument({ title, styles, markup }) {
  return (
    <article aria-label={title}>
      <style>{styles}</style>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
    </article>
  );
}
