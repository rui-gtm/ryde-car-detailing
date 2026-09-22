import { SERVICES } from "@/data/services";
import ServiceCard, { type ServiceCardVariant } from "./ServiceCard";

const ServiceCardGrid = ({ variant = "compact" }: { variant?: ServiceCardVariant }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {SERVICES.map((service, index) => (
      <ServiceCard key={service.id} service={service} variant={variant} index={index} />
    ))}
  </div>
);

export default ServiceCardGrid;
