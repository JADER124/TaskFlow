import { useState,useEffect,useCallback } from "react";
import DetailRequest from "../../components/shared/detailCard";
import { useParams,Outlet } from "react-router-dom";
import { getDetailRequest } from "../../API/allRequests";
import Loader from "../../components/shared/loader"
const RequestDetail = () => {
  const { id } = useParams();

  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshUser, setRefreshUser] = useState(false);

  // Define una FUNCIÓN estable que invierte el estado
  const forceRefresh = useCallback(() => {
    setRefreshUser(v => !v);   // functional updater evita “stale state”
  }, []);

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
  }, [id,refreshUser]);

  if (loading) return (
  <div className="p-4">
    <Loader />
  </div>
  );
  if (error) return (
    <div><p className="p-4 text-red-500">{error}</p></div>
  );
  if (!solicitud) return null;
  

  
 return (
    <div>
      <DetailRequest solicitud={solicitud} onRefresh={forceRefresh} />

      {/* Aquí se montará ViewForm al entrar en /admin/request/:id/form */}
      <Outlet />
    </div>
  );
};

export default RequestDetail;
