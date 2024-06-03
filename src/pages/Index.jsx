import { useState, useEffect } from "react";
import { Container, Text, VStack, Spinner, Box, IconButton } from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Index = () => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bike pump stations data
    fetch("https://api.stockholm.se/ServiceGuideService/ServiceUnitTypes/5e4c4e4e-4e4e-4e4e-4e4e-4e4e4e4e4e4e/ServiceUnits/json?apikey=YOUR_API_KEY")
      .then((response) => response.json())
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Bike Pump Stations in Stockholm</Text>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stations.map((station) => (
            <Box key={station.Id} p={4} borderWidth="1px" borderRadius="lg" width="100%">
              <Text fontSize="lg" fontWeight="bold">
                {station.Name}
              </Text>
              <Text>{station.Address}</Text>
              <IconButton aria-label="Location" icon={<FaMapMarkerAlt />} size="sm" />
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;
