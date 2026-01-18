//#region 
import sendEmail from "../../services/email_service.js";
import contractEvents from "../Events/contractEvents.js";


//#endregion

const createSubscribers = () => {
    
    // For owner
    contractEvents.on('contractCreated', async ({ contract, owner, unit }) => {
        try {
            console.log(`[Notification]: Sending request notification to owner: ${owner.email}`);
            
            const emailHtml = `
            <div style="font-family: sans-serif; color: #333;">
                <h2 style="color: #e67e22;">New Rental Request for: ${unit.title}</h2>
                
                <div style="background: #fdf2e9; padding: 15px; border-radius: 5px; border: 1px solid #f5cba7;">
                    <p><strong>📍 Property Location:</strong> ${unit.location}</p>
                    <p><strong>💰 Monthly Rent:</strong> $${contract.monthRentPrice}</p>
                    <p><strong>📅 Proposed Start:</strong> ${new Date(contract.rentBeginn).toLocaleDateString()}</p>
                </div>

                <p>Hello ${owner.name}, a tenant is interested in the property mentioned above.</p>
                
                <div style="text-align: center; margin-top: 20px;">
                    <a href="hhttps://my_rentora_sphere_app_example.com/dashboard/requests/${contract._id}" 
                        style="background: #2c3e50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                        View Request & Take Action
                    </a>
                </div>
            </div>
        `;

            await sendEmail(owner.email, 'New Rental Request - Action Required', emailHtml);
        } catch (error) {
            console.error('[Notification Error - Owner]:', error.message);
        }
    });

    // For user
    contractEvents.on('contractApproved', async (contract) => {
        try {
            const { user, unit } = contract;
            console.log(`[Notification]: Sending approval notification to user: ${user.email}`);

            const emailHtml = `
                <div style="background-color: #f4f4f4; padding: 20px; font-family: 'Segoe UI', sans-serif;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <div style="background-color: #27ae60; padding: 20px; text-align: center; color: #ffffff;">
                            <h1 style="margin: 0; font-size: 24px;">Rental Approved! 🎉</h1>
                        </div>
                        <div style="padding: 30px; color: #333333;">
                            <h2 style="color: #2c3e50;">Hello ${user.name},</h2>
                            <p style="font-size: 16px; color: #555555;">Great news! Your request for <strong style="color: #27ae60;">${unit.title}</strong> was approved.</p>
                            
                            <div style="background-color: #f9f9f9; border-left: 4px solid #27ae60; padding: 15px; margin: 20px 0;">
                                <p style="margin: 5px 0;"><strong>📍 Location:</strong> ${unit.location}</p>
                                <p style="margin: 5px 0;"><strong>💰 Monthly Rent:</strong> $${contract.monthRentPrice}</p>
                            </div>

                            <div style="text-align: center; margin-top: 30px;">
                                <a href="https://my_rentora_sphere_app_example.com/dashboard" 
                                    style="background-color: #27ae60; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                                    View Contract details
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            await sendEmail(user.email, 'Your Rental Request Approved', emailHtml);
        } catch (error) {
            console.error('[Notification Error - User]:', error.message);
        }
    });
};

export default createSubscribers;