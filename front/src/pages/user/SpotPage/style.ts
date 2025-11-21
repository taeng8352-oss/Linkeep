import styled from "styled-components";
import { theme } from "@/styles/theme";

export const Container = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background};
`;

export const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
`;

export const LoadingText = styled.p`
  color: ${theme.colors.text.muted};
  font-size: ${theme.fontSize.sm};
`;

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.background};
  padding: 0 1rem;
  gap: 1rem;
`;

export const ErrorMessage = styled.p`
  color: ${theme.colors.text.error};
  font-size: ${theme.fontSize.sm};
  text-align: center;
`;

export const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 12rem;
  background-color: ${theme.colors.border.light};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (min-width: 640px) {
    height: 16rem;
  }
`;

export const BadgeContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  display: flex;
  justify-content: space-between;
  max-width: 48rem;
  margin: 0 auto;
`;

export const PriceBadge = styled.div`
  padding: 0.375rem 0.875rem;
  border-radius: ${theme.radius.full};
  background-color: rgba(0, 0, 0, 0.75);
  color: white;
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
`;

export const AvailabilityBadge = styled.div`
  padding: 0.375rem 0.875rem;
  border-radius: ${theme.radius.full};
  background-color: ${theme.colors.badge.available.bg};
  border: 1px solid ${theme.colors.badge.available.border};
  color: ${theme.colors.badge.available.text};
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
`;

export const MainContent = styled.main`
  max-width: 48rem;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const InfoSection = styled.section`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.xl};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadow.sm};
  padding: 1.25rem;
`;

export const LocationHint = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.secondary};
  font-weight: 600;
  margin-bottom: 0.375rem;
`;

export const SpotName = styled.h1`
  font-size: ${theme.fontSize.xl};
  font-weight: 700;
  color: ${theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

export const InfoDescription = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
`;

export const CardGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
`;

export const InfoCard = styled.div`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.lg};
  border: 1px solid ${theme.colors.border.light};
  padding: 0.875rem;
  text-align: center;
`;

export const CardLabel = styled.p`
  font-size: ${theme.fontSize.xs};
  color: ${theme.colors.text.muted};
  margin-bottom: 0.25rem;
`;

export const CardValue = styled.p`
  font-size: ${theme.fontSize.sm};
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

export const FeatureSection = styled.section`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.xl};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadow.sm};
  padding: 1.25rem;
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.primary};
`;

export const FeatureIcon = styled.span`
  font-size: 1.25rem;
`;

export const ReservationSection = styled.section`
  background-color: ${theme.colors.surface};
  border-radius: ${theme.radius.xl};
  border: 1px solid ${theme.colors.border.light};
  box-shadow: ${theme.shadow.sm};
  padding: 1.25rem;
`;

export const ReservationTitle = styled.h2`
  font-size: ${theme.fontSize.lg};
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: 1rem;
`;

export const ReservationForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const TimeInfoBox = styled.div`
  background-color: ${theme.colors.background};
  border-radius: ${theme.radius.md};
  padding: 0.875rem;
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
`;

export const SubmitMessage = styled.p`
  font-size: ${theme.fontSize.sm};
  text-align: center;
  color: ${theme.colors.text.secondary};
  margin-top: 0.5rem;
`;

export const Address = styled.p`
  font-size: ${theme.fontSize.sm};
  color: ${theme.colors.text.secondary};
  margin-bottom: 0.5rem;
`;

export const BookingButton = styled.div`
  position: sticky;
  bottom: 1rem;
  padding-top: 1rem;
`;
