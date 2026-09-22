import { SERVICES, type ServicePackage } from "@/data/services";
import ServiceCard, { type ServiceCardVariant } from "./ServiceCard";

const ServiceCardGrid = ({
  variant = "compact",
  services = SERVICES,
}: {
  variant?: ServiceCardVariant;
  services?: ServicePackage[];
}) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${
      services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
    }`}
  >
    {services.map((service, index) => (
      <ServiceCard key={service.id} service={service} variant={variant} index={index} />
    ))}
  </div>
);

export default ServiceCardGrid;
