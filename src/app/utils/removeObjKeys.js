export const removeObjKeys = ({
  $op,
  _id,
  __v,
  updatedAt,
  createdAt,
  status,
  ...rest
}) => rest
