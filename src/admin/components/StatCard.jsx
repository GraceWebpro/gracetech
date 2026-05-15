const StatCard = ({ title, value }) => (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
      <p className="text-white/60">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
  
  export default StatCard;