import { useState,useEffect } from "react";
import DetailRequest from "../../components/shared/detailCard";
import { useParams } from "react-router-dom";
import { getDetailRequest } from "../../API/allRequests";
const RequestDetail = () => {
  const { id } = useParams();

  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const data = await getDetailRequest(id);
        setSolicitud(data);
      } catch (err) {
        setError("No se pudo obtener la solicitud");
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) return <p className="p-4">Cargando solicitud...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!solicitud) return null;

  
  return <DetailRequest solicitud={solicitud}/>;
};

export default RequestDetail;
