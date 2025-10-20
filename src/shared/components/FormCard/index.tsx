type FormCardProps = {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
};

export const FormCard = ({ title, subtitle, children }: FormCardProps) => {
  return (
    <section className="flex flex-col justify-center gap-5 bg-gray-200/70 rounded-[20px] p-7 w-full h-auto">
      {(title || subtitle) && (
        <div className="flex flex-col gap-2">
          {title && <p className="title-hak">{title}</p>}
          {subtitle && (
            <p className="subtitle-b text-secondary-100">{subtitle}</p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};
