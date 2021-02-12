import Button from '../shared/button/Button';
import Label from '../shared/label/Label';

const BtnCategory = ({ title, onClick }) => {
  return (
    <Label title={title} className="d-flex">
      <Button className="btn-info mh-100 flex-grow-1" title={title} onClick={onClick} />
    </Label>
  );
};

export default BtnCategory;
