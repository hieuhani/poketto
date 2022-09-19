interface Props {
  title: string;
}

export const TitleHeader: React.FunctionComponent<Props> = ({ title }) => {
  return (
    <div className="py-3">
      <h6 className="text-lg">{title}</h6>
    </div>
  );
};
