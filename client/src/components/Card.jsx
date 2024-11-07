/* eslint-disable react/prop-types */

const Card = ({ post }) => {
  return (
    <div className="border p-4">
      <img src={post.image} className="h-40 object-contain" />
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-gray-700">${post.price}</p>
    </div>
  );
};

export default Card;
