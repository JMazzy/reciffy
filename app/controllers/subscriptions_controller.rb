class SubscriptionsController < ApplicationController

  def index

    @subscriptions = Subscription.where("subscriber_id = ?", current_user.id)
    respond_to do |format|
      format.html
      format.json { render json: @subscriptions.to_json(
        include: [:profile, 
                  :subscription_receiver, 
                  :recipes_by_receivers, 
                  :made_recipes_by_receivers, 
                  :subscriptions_by_receivers
        ])}  
    end   
  end
 
   def show
    @subscription = Subscription.find(params[:id])
    respond_to do |format|

      format.html
      format.json { render json: @subscription.as_json }

    end
  end

  def create

    @subscription = current_user.initiated_subscribe_requests.build(subscription_params)

    if @subscription.save
       flash[:success] = "Subscribed!"
    else 
      flash[:alert] = "Could not subscribe! "
    end

    redirect_to :back

  end 

  def destroy

    if @subscription = Subscription.find_by_id(params[:id])

      if @subscription.destroy
        flash[:success] = "UnSubscribed"
      else
        flash[:alert] = "Could not Unsubscribe!"
      end

      redirect_to :back
    else
      flash[:alert] = "Invalid subscription removal! - Unauthorized?"
      redirect_to root_url
    end  
  end 


  private
  def subscription_params
    params.require(:subscription).permit(
      :subscriber_id,
      :subscribed_id)
  end

end