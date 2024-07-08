import React, { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../CustomHook/useAxiosSecure';
import { IoWalletSharp } from "react-icons/io5";
import { BsFillPeopleFill } from "react-icons/bs";
import { PiChefHatFill } from "react-icons/pi";
import { FaTruck } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Sector, ResponsiveContainer,Tooltip, Legend } from 'recharts';

const AdminHome = () => {
    const {user} = useContext(AuthContext);
    const [axiosSecure] = useAxiosSecure();

    const {data: stats = []} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () =>{
            const res = await axiosSecure('/admin-stats');
            return res.data;
        }
    })
    

    const {data: chartData = []} = useQuery({
        queryKey: ['chart-data'],
        queryFn: async()=>{
            const res = await axiosSecure('/order-stats');
            return res.data;
        }
    })
    

        const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];


        const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
        };

        const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
        };

        const data = [
            { name: 'Group A', value: 400 },
            { name: 'Group B', value: 300 },
            { name: 'Group C', value: 300 },
            { name: 'Group D', value: 200 },
          ];
          
          const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
          
          const RADIAN = Math.PI / 180;
          const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
          
            return (
              <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
              </text>
            );
          };

    return (
    
        <div className=' w-[90%] h-screen bg-white py-10'>
            <h2 className='text-3xl font-semibold text-center mb-5'><span className='heading-font text-4xl'>Welcome,</span> <span className='text-[#597445]'>{user.displayName}</span></h2>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-3 justify-center">
  
            <div className="stat border border-[#597445]  rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary">
                <IoWalletSharp  className="text-4xl text-[#597445]"/>

                </div>
                <div className="stat-title">Revenue</div>
                <div className="text-3xl font-bold">${stats.revenue}</div>
                <div className="stat-desc">↗︎ Grow up</div>
            </div>
            
            <div className="stat border border-[#597445]  rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary">
                
                <BsFillPeopleFill  className="text-4xl text-[#597445]"/>
                </div>
                <div className="stat-title">Customers</div>
                <div className="text-3xl font-bold">{stats.users}</div>
                <div className="stat-desc">↗︎ Growing</div>
            </div>
            
            <div className="stat border border-[#597445]  rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary">
                <PiChefHatFill className="text-4xl text-[#597445]"/>

                </div>
                <div className="stat-title">Products</div>
                <div className="text-3xl font-bold">{stats.products}</div>
                <div className="stat-desc">↗︎ Continue Adding</div>
            </div>

            <div className="stat border border-[#597445]  rounded-md bg-white shadow-sm">
                <div className="stat-figure text-secondary">
                <FaTruck className="text-4xl text-[#597445]"/>

                </div>
                <div className="stat-title">Orders</div>
                <div className="text-3xl font-bold">{stats.orders}</div>
                <div className="stat-desc">↘︎ 16 (60%)</div>
            </div>
            
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 my-10 translate-x-[-40px]'>
                <div>
                <BarChart
                    width={500}
                    height={300}
                    data={chartData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="_id" />
                    <YAxis />
                    <Bar dataKey="totalCategoryPrice" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                        {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                        ))}
                    </Bar>
                </BarChart>
                </div>


                <div className='translate-x-[30px] py-5 md:py-0'>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={800} height={800}>
                        <Tooltip />
                        <Legend/>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={130}
                            fill="#8884d8"
                            dataKey="itemCount"
                        >
                            {chartData.map((entry, index) => (
                            <Cell name={entry._id} key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

        </div>
    );
};

export default AdminHome;