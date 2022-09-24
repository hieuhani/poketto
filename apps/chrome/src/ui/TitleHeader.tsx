import { ArrowBackIcon } from '@icons/ArrowBackIcon';

interface Props {
  title: string;
  goBack?: () => void;
}

export const TitleHeader: React.FunctionComponent<Props> = ({
  title,
  goBack,
}) => {
  return (
    <div className="flex items-center py-2 px-2 text-slate-900 dark:text-slate-200">
      {goBack && (
        <button onClick={goBack} className="p-2">
          <ArrowBackIcon className="text-xl" />
        </button>
      )}

      <h6 className="text-lg font-medium">{title}</h6>
    </div>
  );
};
